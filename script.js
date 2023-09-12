document.addEventListener("DOMContentLoaded", function () {
    const postForm = document.getElementById("post-form");
    const blogList = document.getElementById("blog-list");
    const loginButton = document.getElementById("login-button");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search");

    // Fake login functionality
    let isLoggedIn = false;

    loginButton.addEventListener("click", function () {
        if (isLoggedIn) {
            isLoggedIn = false;
            loginButton.textContent = "Log In";
        } else {
            isLoggedIn = true;
            loginButton.textContent = "Log Out";
        }
    });

    postForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("Please log in to create a post.");
            return;
        }

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const image = document.getElementById("image").files[0];

        if (title && content && image) {
            createBlogPost(title, content, image);
            postForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Function to create a new blog post
    function createBlogPost(title, content, image) {
        const blogPost = document.createElement("div");
        blogPost.classList.add("blog-post");

        const imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(image);
        imgElement.alt = title;

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;

        const contentElement = document.createElement("p");
        contentElement.textContent = content;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            blogList.removeChild(blogPost);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            // Implement edit functionality here
        });

        blogPost.appendChild(imgElement);
        blogPost.appendChild(titleElement);
        blogPost.appendChild(contentElement);
        blogPost.appendChild(deleteButton);
        blogPost.appendChild(editButton);

        blogList.appendChild(blogPost);
    }

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const blogPosts = document.querySelectorAll(".blog-post");

        blogPosts.forEach(function (post) {
            const title = post.querySelector("h3").textContent.toLowerCase();
            const content = post.querySelector("p").textContent.toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    });
});
