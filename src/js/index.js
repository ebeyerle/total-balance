import "modern-normalize";
import "../scss/style.scss";


var grand_total = 10e8;
window.isEmbedded = window.self !== window.top;

document.addEventListener("DOMContentLoaded", () => {
    // pull the data
    fetchData();

    // base of the chart
    document
        .getElementById("xxx")
        .setAttribute("d", describeArc(100, 100, 100, 0, 270));
});

const fetchData = () => {
    fetch(
        "https://permissionio-widget.s3.amazonaws.com/Permission_Treasury_Wallet_Balances.json?t=" +
            Date.now()
    )
        .then((res) => res.json())
        .then((res) => {
            // re
            render(res);
            // res
        });
};

const render = (data) => {
    //


    const balance_total = data["Total"].balance;
     console.log(balance_total);

    const ratio = (balance_total / grand_total) * 100;
    document.querySelector(".total").innerText = numberFormat(
        balance_total
    );


    if (isEmbedded) {
        // send size to parent frame
        window.top.postMessage(
            {
                action: "iframeResize",
                height: document.body.scrollHeight,
                // width: document.body.scrollWidth,
            },
            "*"
        );
    }
};

const numberFormat = (string) => {
    if (string == null) return 0;
    return new Intl.NumberFormat("en-US", {
        style: "decimal",
    }).format(string.toString());
};
