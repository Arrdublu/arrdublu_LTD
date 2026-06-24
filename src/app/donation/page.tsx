
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Share2, CreditCard, Landmark, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function DonationPage() {
  const appealText = `URGENT BLOOD APPEAL – PLEASE SHARE

We are once again urgently appealing to the public for blood donations for Ramone Wynter, who remains in critical condition.

A previous appeal was made; however, due to the holiday period, we were unable to receive enough donors. At this time, Ramone still requires additional blood, and the need is ongoing and urgent.

Every donation can make the difference between life and death.

Patient Name: Ramone Wynter
Status: Critical
Location: Spanish Town Hospital / Blood Bank

If you are able to donate, or know someone who can, please act now. Even sharing this message can help save his life.

We are deeply grateful to everyone who has already donated or shared. We are asking, once again, for the public’s continued support during this very difficult time.

Please help us help Ramone.`;

  const pageUrl = 'https://arrdublu.us/donation';
  const shareText = "URGENT BLOOD APPEAL: Please help Ramone Wynter. Every donation or share can save a life."

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Alert variant="destructive" className="mb-12">
          <AlertTitle className="text-2xl font-bold">🚨 Urgent Blood Appeal</AlertTitle>
          <AlertDescription className="text-lg">
            Please read and share. Your help can save a life.
          </AlertDescription>
        </Alert>

        <Card className="shadow-lg mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Help Save Ramone Wynter
            </CardTitle>
            <CardDescription className="text-md md:text-lg pt-2">
              An urgent call for blood donors.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-foreground/90 text-center">
            <p className="whitespace-pre-wrap font-semibold">
              We are once again urgently appealing to the public for blood donations for Ramone Wynter, who remains in critical condition.
            </p>
            <p className="whitespace-pre-wrap">
              A previous appeal was made; however, due to the holiday period, we were unable to receive enough donors. At this time, Ramone still requires additional blood, and the need is ongoing and urgent. Every donation can make the difference between life and death.
            </p>
            
            <div className="bg-muted/50 p-6 rounded-lg my-8 text-left">
                <h3 className="text-xl font-bold text-primary mb-4">Donation Details:</h3>
                <ul className="list-none p-0 m-0 space-y-2">
                    <li><strong>Patient Name:</strong> Ramone Wynter</li>
                    <li><strong>Status:</strong> Critical</li>
                    <li><strong>Location:</strong> Spanish Town Hospital / National Blood Transfusion Service (Blood Bank)</li>
                </ul>
            </div>

            <p>
              If you are able to donate, or know someone who can, please act now. Even sharing this message can help save his life. We are deeply grateful to everyone who has already donated or shared. We are asking, once again, for the public’s continued support during this very difficult time.
            </p>
            <p className="font-bold text-xl mt-6">
              🙏 Please help us help Ramone.
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
            <h3 className="text-lg font-semibold mb-4">Share this Appeal</h3>
            <div className="flex justify-center gap-4">
                 <Button asChild>
                    <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Share2 className="mr-2" /> Share on X
                    </a>
                </Button>
                <Button asChild variant="secondary">
                     <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Share2 className="mr-2" /> Share on Facebook
                    </a>
                </Button>
            </div>
        </div>

        <Separator className="my-12" />

        <div className="space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-headline font-bold text-primary">Financial Contributions</h2>
                <p className="mt-2 text-lg text-muted-foreground">For those who wish to provide financial support, you can do so via the options below.</p>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.328 10.163h17.344v3.664H3.328z" fill="#253B80"></path><path d="M3.328 10.163h3.427L8.03 3.69l3.96 10.137h5.04l-3.552-9.13-3.46 8.877-1.12-3.05-3.55 9.129h5.038l2.45-6.287 1.54 4.167h3.426l-3.987-10.74L24 10.163v-.002l-.634.002H21.5L18.004 0l-4.142 10.163h-3.46L12.564.002 9.102 10.163H3.328z" fill="#009cde"></path><path d="M21.5 10.16h-2.12l.98 2.5h2.123v-2.5zM20.672 13.828h-2.12l.98 2.5h2.123v-2.5zM17.422 13.828H15.3l.98 2.5h2.123v-2.5zM19.672 13.828H17.55l.98 2.5h2.122v-2.5z" fill="#253B80"></path></svg>
                        PayPal
                    </CardTitle>
                    <CardDescription>The fastest and easiest way to contribute.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        You can send money directly to <span className="font-semibold text-foreground">arrdublu@gmail.com</span> or use the button below.
                    </p>
                    <Button asChild className="w-full">
                        <a 
                            href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=arrdublu@gmail.com&item_name=Donation+for+Ramone+Wynter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                             Donate with PayPal
                        </a>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center">
                                <CreditCard className="mr-2" />
                                Credit/Debit Card (Stripe)
                            </CardTitle>
                            <CardDescription>Securely donate using your card. Accepts both USD and JMD.</CardDescription>
                        </div>
                         <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                            <span>Stripe Verified Partner</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Click the button below to proceed to our secure payment page powered by Stripe.
                    </p>
                    <Button asChild className="w-full">
                        <a 
                            href="https://buy.stripe.com/aFacN58UK2Hy9WK5Ho93y0m"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                             <CreditCard className="mr-2" /> Donate with Card
                        </a>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Landmark className="mr-2" />
                        Jamaican Donations (Sagicor)
                    </CardTitle>
                    <CardDescription>For direct bank transfers within Jamaica.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Bank:</span>
                            <span>Sagicor Bank</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Beneficiary Name:</span>
                            <span>Arrdublu Limited</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Account Number:</span>
                            <span className="font-mono">5503216894</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Branch:</span>
                            <span>Hope Road</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Landmark className="mr-2" />
                        Domestic Donations (US)
                    </CardTitle>
                    <CardDescription>For transfers within the United States.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Beneficiary Name:</span>
                            <span>ARRDUBLU LLC</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Beneficiary Address:</span>
                            <span>1317 Edgewater Drive, 2571, Orlando, FL 32804, US</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Account Number:</span>
                            <span className="font-mono">202572364680</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Account Type:</span>
                            <span>Business Checking</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Bank Name:</span>
                            <span>Choice Financial Group</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Bank Address:</span>
                            <span>4501 23rd Avenue S, Fargo, ND 58104, US</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">ABA Routing Number:</span>
                             <span className="font-mono">091311229</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Globe className="mr-2" />
                        International Donations
                    </CardTitle>
                    <CardDescription>For wire transfers from outside the United States.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Beneficiary Name:</span>
                            <span>ARRDUBLU LLC</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Beneficiary Address:</span>
                            <span>1317 Edgewater Drive, 2571, Orlando, FL 32804, US</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">IBAN / Account No:</span>
                            <span className="font-mono">202572364680</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Account Type:</span>
                            <span>Business Checking</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Bank Name:</span>
                            <span>Choice Financial Group</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Bank Address:</span>
                            <span>4501 23rd Avenue S, Fargo, ND 58104, US</span>
                        </li>
                         <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">ABA Routing Number:</span>
                             <span className="font-mono">091311229</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">SWIFT/BIC Code:</span>
                             <span className="font-mono">CHFGUS44021</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
