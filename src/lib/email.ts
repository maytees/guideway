import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const link = `${env.BASE_URL}/auth/verify?token=${token}`;

  await resend.emails.send({
    from: "no-reply@roport.dev",
    to: email,
    subject: "Verify your email",
    html: VerificationEmail(name, link),
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const link = `${env.BASE_URL}/auth/password-reset?token=${token}`;

  await resend.emails.send({
    from: "no-reply@roport.dev",
    to: email,
    subject: "Reset your password",
    html: PasswordRestEmail(name, link),
  });
};

export const sendSubscribeEmail = async (email: string, name: string) => {
  await resend.emails.send({
    from: "no-reply@roport.dev",
    to: email,
    subject: "Thanks for subscribing to Guideway updates",
    html: SubscribeEmail(name),
  });
};

const SubscribeEmail = (name: string) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
   <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
      <style>@media(prefers-color-scheme:dark){.dark_border-gray-800{border-color:rgb(31,41,55)!important}}@media(min-width:768px){.md_px-8{padding-left:2rem!important;padding-right:2rem!important}.md_py-10{padding-top:2.5rem!important;padding-bottom:2.5rem!important}}</style>
   </head>
   <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      Hello ${name}, Welcome to Guideway Updates!
      <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
   </div>
   <body style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;width:100%;height:100%">
      <table align="center" width="100%" class="dark_border-gray-800" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:48rem;width:100%;border-width:1px;border-color:rgb(229,231,235);border-radius:0.5rem">
      <h1 style="font-size: 1.875rem; font-weight: bold; letter-spacing: -0.025em; text-align: center;">Hello ${name}</h1>
         <tbody>
            <tr style="width:100%">
               <td>
                  <table align="center" width="100%" class="md_px-8 md_py-10" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding-left:1rem;padding-right:1rem;padding-top:1.5rem;padding-bottom:1.5rem">
                     <tbody>
                        <tr style="width:100%">
                           <td>
                           <td align="center" data-id="__react-email-column">
                              <p style="font-size:1.125rem;line-height:1.75rem;margin:16px 0;text-align:center">Thank you for signing up to recieve updates from Guideway! We appreciate your interest in staying connected with us.<br/><br/>As a valued member of our community, you&#x27;ll be among the first to know about our latest news, products releases, and offers. We&#x27;re excited to keep you informed and provide you with valuable insights.</p>
                              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                                 <tbody style="width:100%">
                                    <tr style="width:100%">
                                       <p style="font-size:0.875rem;line-height:1.25rem;margin:16px 0;text-align:center;font-weight:600">If you ever wish to unsubscribe from our updates, please visit the link <a href="https://guideway.co/unsubscribe" style="color:#067df7;text-decoration:none;text-decoration-line:underline" target="_blank">here</a>.</p>
                                       <table align="center" width="100%" class="space-y-2" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;display:flex;width:100%;justify-content:center;flex-direction:column;align-items:center">
                                          <tbody>
                                             <tr style="width:100%">
                                                <td>
                                                   <hr style="width:100%;border:none;border-top:1px solid #eaeaea"/>
                                                   <p style="text-align:center;font-size:0.75rem;line-height:1rem">Email sent by <a href="https://guideway.co" style="color:#067df7;text-decoration:none" target="_blank">Guideway</a></p>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>
    `;
};

const PasswordRestEmail = (name: string, link: string) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Hello ${name}, reset your password!<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div></div><style>@media(prefers-color-scheme:dark){.dark\:border-gray-800{border-color:rgb(31,41,55)!important}}@media(min-width:768px){.md\:px-8{padding-left:2rem!important;padding-right:2rem!important}.md\:py-10{padding-top:2.5rem!important;padding-bottom:2.5rem!important}}</style></head><body class="" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;width:100%;height:100%"><table align="center" width="100%" class="dark:border-gray-800" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:48rem;width:100%;border-width:1px;border-color:rgb(229,231,235);border-radius:0.5rem">
    <h1 style="font-size: 1.875rem; font-weight: bold; letter-spacing: -0.025em; text-align: center;">Hello ${name}</h1> 
    <tbody><tr style="width:100%"><td><table align="center" width="100%" class="md:px-8 md:py-10" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding-left:1rem;padding-right:1rem;padding-top:1.5rem;padding-bottom:1.5rem"><tbody><tr style="width:100%"><td><td align="center" data-id="__react-email-column"><h1 class="" style="font-size:1.875rem;line-height:2.25rem;font-weight:700;letter-spacing:-0.025em;text-align:center">Hello ${name},</h1><p style="font-size:1.125rem;line-height:1.75rem;margin:16px 0;text-align:center">We have received a request to reset your password. Please click the button below to reset your password.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><a href="${link}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;background-color:rgb(0,0,0);width:100%;border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Reset password</span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:0.875rem;line-height:1.25rem;margin:16px 0;text-align:center;font-weight:600">If you did not request a password reset, please ignore this email.</p><table align="center" width="100%" class="space-y-2" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;display:flex;width:100%;flex-direction:column"><tbody><tr style="width:100%"><td><hr style="width:100%;border:none;border-top:1px solid #eaeaea"/><p style="text-align:center;font-size:0.75rem;line-height:1rem">Email sent by <a href="https://guideway.co" style="color:#067df7;text-decoration:none" target="_blank">Guideway</a></p></td></tr></tbody></table></tr></tbody></table></td></td></tr></tbody></table></td></tr></tbody></table></body></html>
    `;
};
const VerificationEmail = (name: string, link: string) => {
  // This is weird but react email is having problems with Tailwind
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><style>@media(prefers-color-scheme:dark){.dark\:border-gray-800{border-color:rgb(31,41,55)!important}}@media(min-width:768px){.md\:px-8{padding-left:2rem!important;padding-right:2rem!important}.md\:py-10{padding-top:2.5rem!important;padding-bottom:2.5rem!important}}</style></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Hello ${name}, please verify your account!<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div></div><body class="" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;width:100%;height:100%"><table align="center" width="100%" class="dark:border-gray-800" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:48rem;width:100%;border-width:1px;border-color:rgb(229,231,235);border-radius:0.5rem">
    
    <h1 style="font-size: 1.875rem; font-weight: bold; letter-spacing: -0.025em; text-align: center;">Hello ${name}</h1>
    <tbody><tr style="width:100%"><td><table align="center" width="100%" class="md:px-8 md:py-10" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding-left:1rem;padding-right:1rem;padding-top:1.5rem;padding-bottom:1.5rem"><tbody><tr style="width:100%"><td><td align="center" data-id="__react-email-column"><h1 class="" style="font-size:1.875rem;line-height:2.25rem;font-weight:700;letter-spacing:-0.025em;text-align:center">Hello ${name},</h1><p style="font-size:1.125rem;line-height:1.75rem;margin:16px 0;text-align:center">Thank you very much for signing up to Guideway! But before you can use your account, we ask that you verify your email via the button below.</p><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><a href="${link}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;background-color:rgb(0,0,0);width:100%;border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Verify</span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></tr></tbody></table><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:0.875rem;line-height:1.25rem;margin:16px 0;text-align:center;font-weight:600">If you did not sign up, please ignore this email.</p><table align="center" width="100%" class="space-y-2" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;display:flex;width:100%;flex-direction:column"><tbody><tr style="width:100%"><td><hr style="width:100%;border:none;border-top:1px solid #eaeaea"/><p style="text-align:center;font-size:0.75rem;line-height:1rem">Email sent by <a href="https://guideway.co" style="color:#067df7;text-decoration:none" target="_blank">Guideway</a></p></td></tr></tbody></table></tr></tbody></table></td></td></tr></tbody></table></td></tr></tbody></table></body>
    `;
};
