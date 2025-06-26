// select  elements
const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const profile = document.getElementById('profile');

// Add event listener to the button
searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim(); // trim spaces
    if (username === "") {
        profile.innerHTML = "<p>Please enter a GitHub username.</p>";
        return;
    }

    // Fetch GitHub user data
    fetch(`https://api.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("User not found");
            }
            return res.json();
        })
        .then(user => {


            // profile card
            profile.innerHTML = `
        <img class="avatar" src="${user.avatar_url}" alt="${user.login} Avatar" />
        <h1>${user.name || "No Name Provided"}</h1>
        <h2>@${user.login}</h2>
        <p>${user.bio || "No bio available"}</p>
        <h2>Public repos: ${user.public_repos}</h2>
        <h2>Followers: ${user.followers}</h2>
        <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">View On GitHub</a>
      `;
        })

        .catch(error => {
            profile.innerHTML = `<p>⚠️ ${error.message}</p>`;
        });
});