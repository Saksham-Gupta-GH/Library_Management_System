const API = "http://localhost:3000";

function fetchBooks(forAdmin = true) {
  fetch(`${API}/books`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("book-list");
      list.innerHTML = "";
      data.forEach(b => {
        const div = document.createElement("div");
        div.innerHTML = `${b.title} by ${b.author} - Qty: ${b.quantity}`;
        if (forAdmin) {
          div.innerHTML += ` <button onclick="deleteBook('${b._id}')">Delete</button>`;
        } else {
          div.innerHTML += ` <button onclick="borrowBook('${b._id}')">Borrow</button>`;
        }
        list.appendChild(div);
      });
    });
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const quantity = +document.getElementById("quantity").value;
  fetch(`${API}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, quantity })
  }).then(() => fetchBooks());
}

function deleteBook(id) {
  fetch(`${API}/books/${id}`, { method: "DELETE" }).then(() => fetchBooks());
}

function borrowBook(bookId) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    alert('Please login first');
    return;
  }
  
  fetch(`${API}/borrow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId })
  }).then(res => {
    if (res.ok) {
      fetchBooks(false);
      fetchBorrowed(userId);
      alert('Book borrowed successfully!');
    } else {
      alert("Book unavailable");
    }
  });
}

function fetchBorrowed(userId) {
  fetch(`${API}/borrowed/${userId}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("borrowed-list");
      list.innerHTML = "";
      
      if (data.length === 0) {
        list.innerHTML = "<p>No books borrowed yet.</p>";
        return;
      }
      
      data.forEach(b => {
        const div = document.createElement("div");
        div.className = "borrowed-book";
        
        const borrowDate = new Date(b.borrowDate).toLocaleDateString();
        const dueDate = new Date(b.dueDate).toLocaleDateString();
        const isOverdue = new Date(b.dueDate) < new Date();
        
        div.innerHTML = `
          <strong>${b.title}</strong> by ${b.author}<br>
          <small>📅 Borrowed: ${borrowDate} | 📆 Due: ${dueDate}</small>
          ${isOverdue ? '<br><span style="color: red;">⚠️ OVERDUE</span>' : ''}
        `;
        
        if (isOverdue) {
          div.style.backgroundColor = '#ffe6e6';
          div.style.border = '1px solid #ff9999';
          div.style.padding = '10px';
          div.style.marginBottom = '10px';
          div.style.borderRadius = '5px';
        } else {
          div.style.backgroundColor = '#f0f8ff';
          div.style.border = '1px solid #ccc';
          div.style.padding = '10px';
          div.style.marginBottom = '10px';
          div.style.borderRadius = '5px';
        }
        
        list.appendChild(div);
      });
    });
}
