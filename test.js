import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/tmap-route", async (req, res) => {
    const response = await fetch('https://apis.openapi.sk.com/tmap/app/routes?version=1', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'appKey': 'MiVaiAStXs9jrH0PttkrCa3CkR7dwRQ71HkFyI4m'
        },
        body: JSON.stringify({
            startX: 36.3855872,
            startY: 139.3557504,
            endX: 37.5035934,
            endY: 126.8797,
            tollgateFareOption: '2',
            mainRoadInfo: 'Y'
        })
    });
    res.send(response);
});

app.listen(3000);