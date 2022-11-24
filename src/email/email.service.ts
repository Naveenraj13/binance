import { Injectable } from '@nestjs/common';
const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = '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'

@Injectable()
export class EmailService {
    sendMail() {
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
                textContent: `Hiii Gokul, Good Morning`,
                params: {
                    role: 'Frontend',
                },
            }).then(console.log)
            .catch(console.log)
        return true;
    }
}
