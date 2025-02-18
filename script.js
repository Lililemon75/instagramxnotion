
const NOTION_API_KEY = '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';
const DATABASE_ID = '156bacdb4b9880ff808af4fa7ad149d9';

const instagramFeed = document.getElementById('instagram-feed');
const storiesHighlights = document.getElementById('stories-highlights');

async function fetchNotionData() {
    const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28'
        }
    });

    const data = await response.json();
    const results = data.results;

    results.forEach(item => {
        const imageUrl = item.properties.Image?.files[0]?.file?.url;
        const type = item.properties.Type?.select?.name;

        if (imageUrl && type === 'Photo') {
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('instagram-photo');
            photoDiv.innerHTML = `<img src="${imageUrl}" alt="Photo Instagram">`;
            instagramFeed.appendChild(photoDiv);
        }

        if (imageUrl && type === 'Story') {
            const storyDiv = document.createElement('div');
            storyDiv.classList.add('story');
            storyDiv.innerHTML = `<img src="${imageUrl}" alt="Story Highlight">`;
            storiesHighlights.appendChild(storyDiv);
        }
    });
}

fetchNotionData();
