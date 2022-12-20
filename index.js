const getSignatures = () => {
    document.getElementById("signatures").innerHTML = "";
    fetch("https://www.jianminchen.com/api/various/holiday2022")
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                const signaturesContainer =
                    document.getElementById("signatures");
                for (let signature of json.signatures) {
                    let p = document.createElement("p");
                    p.innerText = signature;
                    p.style.transform = `rotate(${Math.floor(
                        Math.random() * (15 - -15 + 1) - 15
                    )}deg)`;
                    signaturesContainer.appendChild(p);
                }
            }
        });
};

const createNewToast = msg => {
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `<p>${msg}</p>`;
    document.getElementById("toasts").appendChild(toast);
};

window.onload = () => {
    // Generate signatures
    getSignatures();

    alert(
        "Flip to the back using the button in the bottom right corner to sign!"
    );

    tsParticles.load("tsparticles", {
        preset: "fireworks"
    });

    document.getElementById("flip-button").addEventListener("click", () => {
        if (
            document.getElementById("card-inner").style.transform ===
            "rotateY(180deg)"
        )
            document.getElementById("card-inner").style.transform = "";
        else
            document.getElementById("card-inner").style.transform =
                "rotateY(180deg)";
    });

    document.getElementById("share-button").addEventListener("click", () => {
        navigator.clipboard.writeText("https://holiday2022.cchs.hackclub.com");
        createNewToast("Copied to clipboard");
    });

    document.getElementById("sign").addEventListener("submit", event => {
        event.preventDefault();

        const name = event.target.name.value;
        if (!name) alert("Please enter a name!");
        else {
            // Upload name to database
            fetch("https://www.jianminchen.com/api/various/holiday2022", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ name })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.error) createNewToast(json.error);
                    else {
                        getSignatures();
                        createNewToast(
                            "Awesome! Now send this card off to someone!"
                        );
                    }
                })
                .catch(err => createNewToast(err));
        }
    });
};
