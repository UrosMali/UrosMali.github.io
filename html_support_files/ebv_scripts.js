/**************************************************************************
 * TEMPLATING CODE
 **************************************************************************/

/* TODO: populate - The title of the lab*/
const lab_title = "EBV-IoT - Infineon & Avnet IoTConnect Secure Cloud connection solution - Training manual";

/* TODO: populate -
* array of string representing lab pages used to populate side navigation bar.
* Format of array:
* html-page-name, text-to-represent-page,
* ...
*/
const pages_in_lab = [
    "index.html", "Introduction",
    "2-Main_system_components.html", "2. Main system components",
    "3_System_setup.html", "3. System setup using evaluation hardware",
    ".html", "4. Hardware configuration",
    ".html", "5. EBV IoTConnect – Solution Accelerator Software",
    ".html", "6. Task 1: PSoC programming and debugging – Hello world",
    ".html", "7. Task 2: PSoC programming and debugging – Adding sensors",
    ".html", "8. Task 3: OPTIGA provisioning for IoTConnect Cloud",
    ".html", "9. Task 4: Create a device in IoTConnect Cloud",
    ".html", "10. Task 5: Getting hardware ready for IoTConnect cloud",
    ".html", "11. Task 6: Connecting the demo to IoTConnect Cloud	67",
    ".html", "12. Task 7: Remote access from EBV Mobile App"

];


    

    


/** Class for fulfilling the templating requirements of lab creation */
class Lab_templater {
    #next_page_name; /* Variable used to retain the next page document name for creation of next page button*/

    constructor() {
        /* Do Nothing*/
    }

    /* Function to populate the pages header*/
    Generate_header() {
        var html = `<header class="banner">
                    </header><br>`;

        /* Add the header element to the document*/
        this.#Append_html(document.getElementsByTagName('body')[0], html); /* Append html to body*/

        /* populate the banner and side navigation panes*/
        this.#Generate_banner();
        this.#Generate_sidenav();
    }
    /* End of function*/

    /* Function to popuate the next page button - txt = text inside button
    *  Note before calling this function, the Generate_sidenav function must be called.
    */
    Generate_next_page_button(txt) {
        var html = `<button class="next-page-button" onclick="document.location='` + this.#next_page_name + `'">` + txt + `</button>`;

        this.#Append_html(document.getElementsByClassName('main-content')[0], html); /* Append html to the end of main-content*/
    }
    /* End of function*/

    /* Function to prepare pages modal*/
    Prepare_modal() {
        /* Create the modal div*/
        var html = `<!-- Image Modal -->
		<div id="image-modal" class="modal">
			<span class="modal-close-button">&times;</span>
			<img class="modal-content" id="modal-image-area">
			<div id="modal-caption"></div>
		</div>`;

        this.#Append_html(document.getElementsByClassName('main-content')[0], html); /* Append html to the end of main-content*/

        /* Get the modal*/
        var modal = document.getElementById("image-modal");

        /* Get all the small images (modal-thumbnails)*/
        var images = document.getElementsByClassName("modal-thumbnails");
        /* Get the modal image area*/
        var modalImg = document.getElementById("modal-image-area");
        /* Get the modal caption*/
        var captionText = document.getElementById("modal-caption");

        /* Go through all of the images with the thumbnail class*/
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            /* and attach the click listener the the images.*/
            img.onclick = function (evt) {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            }
        }

        /* Get the <span> element that closes the modal*/
        var span = document.getElementsByClassName("modal-close-button")[0];

        /* When the user clicks on <span> (x), close the modal*/
        span.onclick = function () {
            modal.style.display = "none";
        }
    }
    /* End of function*/

    /* Function to append html to an element*/
    #Append_html(el, str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    }
    /* End of function*/

    /* Function to populate the header banner
    * str is the string for the title of the lab
    */
    #Generate_banner() {
        var html = `<span class="banner-menu-button" onclick="Open_sidenav()">&#9776;</span>
		            <p class="banner-heading">` + lab_title + `</p>
		            <a href="https://www.ebv.com" target="_blank"><img class="banner-logo"
		            src="html_support_files/EBVfullWhite.png" /></a>`;

        this.#Append_html(document.getElementsByTagName('header')[0], html); /* Append html to header*/
    }
    /* End of function*/

    /* Function to create the sidenav - note this function must be called before calling the Generate_next_page_button function.*/
    #Generate_sidenav() {
        var side_nav_links = "";
        var current_page = window.location.pathname.split("/").pop();
        
        /* If it's an empty string - it's likely index.html*/
        if("" == current_page) {
            current_page = "index.html";
        }

        for (let index = 0; index < pages_in_lab.length; index += 2) {
            const page = pages_in_lab[index];
            const name = pages_in_lab[index + 1];

            /* Set the active page*/
            if (page == current_page) {
                side_nav_links += '<a class="active" href=' + page + '>' + name + '</a>';

                /* If we are on the last page*/
                if ((index + 2) >= pages_in_lab.length) {
                    this.#next_page_name = pages_in_lab[0]; /* Save the first page for the next page button*/
                }
                else {
                    this.#next_page_name = pages_in_lab[index + 2]; /* Save the next page for the next page button*/
                }
            }
            else {
                side_nav_links += '<a href=' + page + '>' + name + '</a>';
            }
        }

        /* Add an empty text element fill sidenav ensuring scroll bar correct behaviour*/
        side_nav_links += '<p></p>';

        var html = `<div id="local-side-nav" class="sidenav">
                        <a href="javascript:void(0)" class="sidenav-close-button" onclick="Close_sidenav()">&#10006;</span>`
            + side_nav_links +
            `</div>`;

        this.#Append_html(document.getElementsByTagName('header')[0], html); /* Append html to header*/
    }
    /* End of function*/
}
/* End of class*/

/* Instantiation of templating class*/
var lab_templater = new Lab_templater();

/**************************************************************************
 * SIDE NAVIGATION CODE
 **************************************************************************/

/* Function for opening the side navigation menu*/
function Open_sidenav() {
    document.getElementById("local-side-nav").style.width = "50%";
}
/* End of function*/

/* Function for closing the side navigation menu*/
function Close_sidenav() {
    document.getElementById("local-side-nav").style.width = "0";
}
/* End of function*/

/**************************************************************************
 * CODE SNIPPET COPYING
 **************************************************************************/

/* Function to setup code snippet copy buttons */
function Setup_code_copy() {
    /* Do so only if the browser supports clipboard API*/
    if (navigator.clipboard) {
        /* Get all pre blocks (these blocks contain code snippets*/
        let blocks = document.querySelectorAll("pre");

        /* Add a button to each pre containing the code snippets*/
        blocks.forEach((block) => {
            /* Only apply the button if the element isn;t mark with no-copy class*/
            if(!block.classList.contains("no-copy"))
            {
                let button = document.createElement("button");
                /* Add style class to button so we can style it in css*/
                button.classList.add("copy-code-button");
                button.innerText = "Copy Code";
                button.addEventListener("click", Copy_code);
                /* Append the button as a child element to the <pre> element*/
                block.appendChild(button);
            }
        });
    }
}
/* End of function*/

/* Copy code async function*/
async function Copy_code(event) {
    /* Get the <code> element by using the <pre> parent element to the click-source button element*/
    const button = event.srcElement;
    const pre = button.parentElement;
    let code = pre.querySelector("code");

    /* Get the text inside the <code> element*/
    let text = code.innerText;

    /* Copy and wait until complete*/
    await navigator.clipboard.writeText(text);

    /* Signal the code has been copied*/
    button.innerText = "Code Copied";

    /* Undo signalling after 1sec*/
    setTimeout(() => {
        button.innerText = "Copy Code";
    }, 1000);
}
/* End of function*/
