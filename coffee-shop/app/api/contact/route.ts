import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function getRateLimitKey(ip: string): string {
  return `contact:${ip}`
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const key = getRateLimitKey(ip)
  const now = Date.now()

  const existing = rateLimitStore.get(key)

  if (!existing || existing.resetAt < now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS
    rateLimitStore.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt }
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  rateLimitStore.set(key, existing)
  return { allowed: true, remaining: RATE_LIMIT_MAX - existing.count, resetAt: existing.resetAt }
}

// Clean up expired entries periodically
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    // Clean up old entries occasionally
    if (Math.random() < 0.1) {
      cleanupRateLimitStore()
    }

    // Check rate limit
    const { allowed, remaining, resetAt } = checkRateLimit(ip)
    if (!allowed) {
      const resetInSeconds = Math.ceil((resetAt - Date.now()) / 1000)
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please try again in ${Math.ceil(resetInSeconds / 60)} minutes.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(resetAt),
          },
        }
      )
    }

    // Parse body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      )
    }

    const { name, email, message } = body as { name?: string; email?: string; message?: string }

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters.' },
        { status: 400 }
      )
    }

    if (name.trim().length > 100 || message.trim().length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Input exceeds maximum length.' },
        { status: 400 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'owner@coffeeshop.com'

    if (!process.env.RESEND_API_KEY) {
      // In development without Resend configured, just log and return success
      console.log('Contact form submission (Resend not configured):', {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      })
      return NextResponse.json(
        { success: true, message: 'Message received! (Email not sent - Resend not configured)' },
        {
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': String(remaining),
          },
        }
      )
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Bloom Coffee Contact Form <noreply@bloomcoffee.com>',
      to: [contactEmail],
      reply_to: email.trim(),
      subject: `New message from ${name.trim()} — Bloom Coffee`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #3E2C2C; font-size: 22px; margin-bottom: 8px;">New Contact Form Message</h2>
          <hr style="border: none; border-top: 2px solid #F8D7DA; margin-bottom: 24px;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #3E2C2C; font-size: 14px; font-weight: 600;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #3E2C2C; font-size: 14px;">
                <a href="mailto:${email.trim()}" style="color: #C9A9A6;">${email.trim()}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Message</p>
            <div style="background: #FFF9F4; border: 1px solid #F8D7DA; border-radius: 8px; padding: 16px; color: #3E2C2C; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</div>
          </div>

          <hr style="border: none; border-top: 1px solid #F8D7DA; margin-top: 32px; margin-bottom: 16px;" />
          <p style="color: #9ca3af; font-size: 12px;">This message was sent via the Bloom Coffee contact form.</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been sent! We will get back to you soon.' },
      {
        headers: {
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
