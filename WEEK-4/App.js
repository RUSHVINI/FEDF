// =======================================
// TypeScript-like Interface (for understanding)
// interface User {
//    id: number;
//    name: string;
//    email: string;
// }
// =======================================
// API Layer (Async Programming)
const UserAPI = {
    fetchUsers: async function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;
                if (success) {
                    resolve([
                        { id: 1, name: "Rushvini", email: "Rushvini@gmail.com" },
                        { id: 2, name: "Roja", email: "Roja@gmail.com" },
                        { id: 3, name: "Rani", email: "Rani@gmail.com" },
                        { id: 1, name: "Ashwini", email: "Ashwini@gmail.com" },
                        { id: 2, name: "Madhu", email: "Madhu@gmail.com" },
                        { id: 3, name: "Rushitha", email: "Rushitha@gmail.com" },
                        { id: 1, name: "Divya", email: "Divya@gmail.com" },
                        { id: 2, name: "Raju", email: "Raju@gmail.com" },
                        { id: 3, name: "Ravi", email: "Ravi@gmail.com" },
                        { id: 3, name: "Varshini", email: "Varshini@gmail.com" }

                    ]);
                } else {
                    reject("Failed to fetch users");
                }
            }, 2000);
        });
    }
};
// UI Layer
const UI = {
    displayUsers(users) {
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    }
};
// Controller Layer
async function loadUsers() {
    try {
        console.log("Loading users...");
        const users = await UserAPI.fetchUsers();
        UI.displayUsers(users);
        console.log("Users loaded successfully");
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
}
