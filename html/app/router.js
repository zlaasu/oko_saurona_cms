// getElementById wrapper
function $id(id) {
    return document.getElementById(id);
}

// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
        $id(id).innerHTML = req.responseText;
        return true;
    };
}

let root = null;
let useHash = true; // Defaults to: false
const router = new Navigo(root, useHash, HASH);
//const router = new Navigo();

router
    .on({
        '/login': function () {
            HelloVietnam.clear();
            HelloVietnam.login();
        },
        '/register': function () {
            HelloVietnam.clear();
            HelloVietnam.register();
        },
        '/home': function () {
            HelloVietnam.clear();
            HelloVietnam.header();
            HelloVietnam.menu();
        },
        '/device': function () {
            HelloVietnam.deviceList();
        },
        '/device/:id': function (param) {
            HelloVietnam.deviceEdit(param);
        },
        '/trap': function () {
            HelloVietnam.trap();
        },
        '/map': function () {
            HelloVietnam.map();
        },
        '/heatmap': function () {
            HelloVietnam.mapHeat();
        },
        '*': function () {
            console.log('Home......');
        }
    })
    .resolve();

// set the default route
router.on(() => {
    $id('view').innerHTML = '<h2>Here by default</h2>';
});

// set the 404 route
router.notFound((query) => {
    $id('view').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>';
});

router.resolve();