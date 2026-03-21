const fs = require('fs');
const path = require('path');
const https = require('https');

const domain = 'chronicreload.com';
const siteUrl = `https://${domain}`;
const apiKey = 'c0c0c4d6edf749db9dec4af4e81d9c49';

// 1. Get all post URLs
const postsDirectory = path.join(process.cwd(), 'posts');
const fileNames = fs.readdirSync(postsDirectory);
const postUrls = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    return `${siteUrl}/blog/${slug}`;
});

// 2. Add core static URLs
const staticUrls = [
    siteUrl,
    `${siteUrl}/about`,
    `${siteUrl}/contact`,
    `${siteUrl}/categories`,
    `${siteUrl}/games`,
    `${siteUrl}/hardware`,
    `${siteUrl}/news`,
];

const allUrls = [...staticUrls, ...postUrls];

// 3. Prepare payload for IndexNow
const payload = JSON.stringify({
    host: domain,
    key: apiKey,
    keyLocation: `${siteUrl}/${apiKey}.txt`,
    urlList: allUrls
});

// 4. Send request to IndexNow
const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
    }
};

console.log(`Submitting ${allUrls.length} URLs to IndexNow...`);

const req = https.request(options, (res) => {
    console.log(`Response Status: ${res.statusCode}`);

    if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('✅ Successfully submitted URLs to Bing/IndexNow!');
    } else {
        console.log('❌ Failed to submit URLs. Check the status code above.');
    }

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error('Error submitting to IndexNow:', error);
});

req.write(payload);
req.end();
