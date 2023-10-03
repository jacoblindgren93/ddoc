using System.Net.Mail;
using System.Net;
using System.Text.Json;

namespace backend.Utils
{
    public static class EmailSender
    {   

        public static void Send(string email, string subject, string body)
        {

            string json = File.ReadAllText("secrets.json");
            var secrets = JsonSerializer.Deserialize<MailCredentials>(json);

            if(secrets == null )
            {
                return;
            }

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(secrets.Email, secrets.Password),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(secrets.Email),
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            };
            mailMessage.To.Add("Jacob.lindgren@live.com");

            smtpClient.Send(mailMessage);
        }

    }
}
