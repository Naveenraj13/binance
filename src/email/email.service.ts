import { Injectable } from '@nestjs/common';
const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = 'GOKUL REPLACE THE KEY HERE'

@Injectable()
export class EmailService {
    sendMail(text: any) {
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: 'naveenraj.mju@gmail.com',
            name: 'Naveen',
        }
        const receivers = [
            {
                email: 'ssgokulkrishna22@gmail.com',
            },
        ]

        tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'New Candle Pattern Detected',
                textContent: text,
                params: {
                    role: 'Frontend',
                },
            }).then(console.log)
            .catch(console.log)
        return true;
    }
}
