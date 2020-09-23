const checkForm = ({ formErrors }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    return valid;
};

function useQuery() {
    let obj = new URLSearchParams(window.location.search);
    let res = {}
    for (const [key, value] of obj) {
        res[key] = value;
    }
    return (res);
}

function fixedParseInt(str) {
    if (str === "") //Normally if the string is empty the function parseInt should return 0 but JS decied that it wants to be an annoying peace of shit!!!
        return (0);
    return (parseInt(str));
}

//Yeah now we've got to reimplement some WinApi functions in JS thanks to JavaScript unable to handle something as simple as just a clipboard!
//For reference even Win32 API is MUCH MUCH simpler (https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setclipboarddata)
//I love it Microsoft is able to achieve better and simpler than most companies in the world including Google!
function setClipboardData(data) {
    //Create a useless a text area
    let useless = document.createElement("textarea");
    useless.id = "useless-pussy-hell-fucker-js-mothershit"
    useless.value = data;
    useless.style.top = "0";
    useless.style.left = "0";
    useless.style.position = "fixed";
    document.body.appendChild(useless);
    useless.onfocus = () => {
        document.execCommand('copy');
    };
    useless.focus();
    useless.select();
    for (let i = 0; i !== 50; ++i) {
        useless.focus();
        useless.select();
    }
    document.body.removeChild(useless);
}

export { checkForm, useQuery, fixedParseInt, setClipboardData };