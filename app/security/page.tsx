export default function Security() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-20">
            <h1 className="text-3xl font-bold mb-6">Security</h1>

            <p className="mb-8">
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Secure Data Transmission</h2>
            <p className="mb-4">
                All traffic to and from AllToolkit is encrypted using industry-standard SSL/TLS (Secure Sockets Layer/Transport Layer Security) technology. This ensures that any data you transmit to our site—whether it's a file for conversion or a search query—is protected from interception by third parties. You can verify this by looking for the padlock icon in your browser's address bar.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Ephemeral Data Processing</h2>
            <p className="mb-4">
                One of our core security principles is that we only keep what we need, for as long as we need it. For tools that operate on files (like PDF or Image utilities):
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Local Processing:</strong> Many of our tools run entirely in your browser using JavaScript. This means your files never even leave your computer.</li>
                <li><strong>Server-side Sanitization:</strong> For tools that require server-side logic, files are processed in secure, isolated memory environments. Once the task is finished and the output is provided, the data is marked for immediate deletion.</li>
                <li><strong>No Persistent Storage:</strong> We do not maintain any long-term storage of user-uploaded content. Automated scripts ensure that any temporary files are purged from our systems every hour.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Infrastructure Security</h2>
            <p className="mb-4">
                Our servers are hosted in world-class data centers that employ rigorous physical and digital security measures. This includes 24/7 monitoring, biometric access controls, and redundant fire suppression systems. We regularly update our server software and apply security patches to protect against known vulnerabilities.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Security of Third-Party Ad Networks</h2>
            <p className="mb-4">
                We use Google AdSense to serve ads on our site. Google uses its own security protocols to ensure that the ads served are safe and do not contain malicious code. However, we recommend that users always keep their browser and antivirus software up to date as a general safety precaution.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Reporting Vulnerabilities</h2>
            <p className="mb-4">
                We welcome feedback from the security community. If you discover a potential security vulnerability on our site, please contact us immediately. We will investigate all legitimate reports and do our best to quickly fix any issues.
            </p>
        </div>
    );
}
