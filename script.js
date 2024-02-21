const username = document.getElementById('username');
const profileContents = document.getElementById('profiles');
const grassContents = document.getElementById('grass');
const repoContents = document.getElementById('repos');

class User {
    constructor(name) {
        this.name = name;
    }

    async getData() {
        const name = username.value;

        try {
            const userData = await fetch(`https://api.github.com/users/${name}`);
            const userJson = await userData.json();

            const repoData = await fetch(`https://api.github.com/users/${name}/repos`);
            const repoJson = await repoData.json();
            
            profileContents.innerHTML = `
            <div>
                <img class="profile-img" src="${userJson.avatar_url}" alt="user-picture">
                <button class="profile-btn">View Profile</button>
            </div>
            <div class="details">
                <span class="badge bg-primary">Public Repos: ${repoJson.html_url}</span>
                <span class="badge bg-secondary">Public Gists: ${userJson.gist_urls}</span>
                <span class="badge bg-success">Followers: ${userJson.followers}</span>
                <span class="badge bg-info text-dark">Following: ${userJson.following}</span>
                <div class="detail-info">
                    <p>Company: ${userJson.company}</p><hr>
                    <p>Website/Blog: ${userJson.blog}</p><hr>
                    <p>Location: ${userJson.location}</p><hr>
                    <p>Member Since: ${userJson.created_at}</p>
                </div>
            </div>`;

            grassContents.innerHTML = `
            <div class="grass">
                <p>contributions in last year</p>
                <img src="https://ghchart.rshah.org/${name}" alt="contributions-graph">
            </div>`;

            repoJson.forEach(repo => {
                repoContents.innerHTML += `
                <div class="repo">
                    <p>${repo.name}</p>
                    <div class="repo-detail">
                        <span class="badge bg-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge bg-secondary">Watchers: ${repo.watchers_count}</span>
                        <span id="repo-span" class="badge bg-success">Forks: ${repo.forks}</span>
                    </div>
                </div>`;
            })
        } catch(error) {
            console.error(error);
        }
    }
};

username.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === '\n') {
        const user = new User(username.value);
        user.getData();
    }
})