// آخر نتيجة للمباراة
const latestMatch = {
    team1: {
        name: "SC Mavro",
        logo: "3be07d4d222f06f0333810def3d4dfd7-removebg-preview.png",
        score: 3,
    },
    team2: {
        name: "SC Ravio",
        logo: "2ff91478be53050d0605f4905bfa3f5b-removebg-preview.png",
        score: 1,
    },
};

// المباريات القادمة
const upcomingMatches = [
    {
        date: "2024-12-28",
        opponent: "Edfu FC",
        time: "7:30 PM",
        location: "Mavro Stadium",
    },
    {
        date: "2025-1-4",
        opponent: "Elseil FC",
        time: "10:00 PM",
        location: "Elseil Stadium",
    },
    {
        date: "2025-1-8",
        opponent: "Karour SC",
        time: "10:00 PM",
        location: "Aswan Stadium",
    },
];

// تعليقات المعجبين
const fanComments = [
    { text: "Looking forward to the next match! SPORTING CLUB!", author: "Ebraam" },
    { text: "Chasing greatness! THE CHAMPIONS!", author: "Magy" },
    { text: "Game time hustle! WINNING CREW!", author: "MARIO" },
];

// عرض آخر نتيجة مباراة
function renderLatestMatch() {
    const matchDetailsContainer = document.querySelector(".match-details");
    if (!matchDetailsContainer) {
        console.error("لا يوجد حاوية لعرض تفاصيل المباراة!");
        return;
    }
    matchDetailsContainer.innerHTML = `
        <div class="team-result">
            <img src="${latestMatch.team1.logo}" alt="${latestMatch.team1.name} Logo">
            <p>${latestMatch.team1.name}</p>
            <span>${latestMatch.team1.score}</span>
        </div>
        <div class="team-result">
            <img src="${latestMatch.team2.logo}" alt="${latestMatch.team2.name} Logo">
            <p>${latestMatch.team2.name}</p>
            <span>${latestMatch.team2.score}</span>
        </div>
    `;
}

// عرض المباريات القادمة
function renderUpcomingMatches() {
    const matchesTableBody = document.querySelector(".upcoming-matches tbody");
    if (!matchesTableBody) {
        console.error("لا يوجد جدول للمباريات القادمة!");
        return;
    }
    matchesTableBody.innerHTML = ""; // مسح أي صفو
    upcomingMatches.forEach((match) => {
        const row = `
            <tr>
                <td>${match.date}</td>
                <td>${match.opponent}</td>
                <td>${match.time}</td>
                <td>${match.location}</td>
            </tr>
        `;
        matchesTableBody.insertAdjacentHTML("beforeend", row);
    });
}


function toggleDetails(playerId) {
    console.log("Toggle Details for: " + playerId);
     {
       
        var details = document.getElementById(playerId);
    
        if (details.style.display === "none" || details.style.display === "") {
            details.style.display = "block";
        } else {
            details.style.display = "none";
        }
    
        var allDetails = document.querySelectorAll('.player-details');
        allDetails.forEach(function(detail) {
            if (detail.id !== playerId) {
                detail.style.display = "none";
            }
        });
    }
}



function toggleDetails2() {
    if(document.querySelector(".member-item-main").style.height==="fit-content"){
        document.querySelector(".member-item-main").style.height="25px"
    }else{
        document.querySelector(".member-item-main").style.height="fit-content"
    }
}






// عرض تعليقات المعجبين
function renderFanComments() {
    const commentsContainer = document.querySelector(".fan-comments");
    const commentsSection = commentsContainer?.querySelector(".comments-list");
    if (!commentsSection) {
        console.error("لا يوجد قسم للتعليقات!");
        return;
    }
    commentsSection.innerHTML = ""; // مسح التعليقات الموجودة
    fanComments.forEach((comment) => {
        const commentHTML = `
            <div class="comment">
                <p>"${comment.text}"</p>
                <span>- ${comment.author}</span>
            </div>
        `;
        commentsSection.insertAdjacentHTML("beforeend", commentHTML);
    });
}

// إضافة تعليق جديد
function addComment(text, author) {
    if (text && author) {
        fanComments.push({ text, author });
        renderFanComments();
    } else {
        alert("يرجى ملء كلا الحقلين!");
    }
}

// تهيئة الصفحة
function initializePage() {
    renderLatestMatch();
    renderUpcomingMatches();
    renderFanComments();

    // إضافة حدث إرسال النموذج للتعليق
    const commentForm = document.querySelector("#commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const commentText = document.querySelector("#commentText").value;
            const commentAuthor = document.querySelector("#commentAuthor").value;
            addComment(commentText, commentAuthor);
            commentForm.reset();
        });
    }

    // إضافة تأثير الـ Ripple على الأزرار
    document.querySelectorAll(".submit-btn, .report-filters button").forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            ripple.style.left = `${e.clientX - button.getBoundingClientRect().left}px`;
            ripple.style.top = `${e.clientY - button.getBoundingClientRect().top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // إضافة حدث إرسال شكوى
    const complaintForm = document.querySelector("#complaintBox");
    const submitBtn = document.querySelector(".submit-btn");

    if (submitBtn && complaintForm) {
        submitBtn.addEventListener("click", () => {
            const complaintText = complaintForm.value.trim();
            if (complaintText) {
                alert("شكراً! تم تقديم شكواك.");
                complaintForm.value = ""; // مسح مربع الشكوى
            } else {
                alert("يرجى ملء الشكوى قبل الإرسال!");
            }
        });
    }
}

// تفعيل الأنيميشن عند التمرير
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section, .complaint-section");
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
            section.style.transition = "all 0.5s ease"; // انتقال سلس
        }
    });
});

// إعادة تعيين تأثير الأنيميشن عند تحميل الصفحة
document.querySelectorAll("section, .complaint-section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
});

// تشغيل دالة تهيئة الصفحة بعد تحميل الـ DOM
document.addEventListener("DOMContentLoaded", initializePage);
