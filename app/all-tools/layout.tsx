// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2422025830935555"
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body>{children}</body>
        </html>
    );
}
