const results = document.querySelector("#results");

document.querySelector("#getByOmrade").addEventListener('click', getByOmrade);

function getByOmrade() {

    var loadImage = document.querySelector('#loading');
    loadImage.style.display = 'block';
    const link = 'https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=skolor_ny&q=&rows=500&facet=namn&facet=omrade&facet=skoltyp&facet=huvudman';
    const omrade = document.querySelector("#omrade");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);

    setTimeout(() => {
        xhr.onload = function() {
            loadImage.style.display = "none";

            if (this.status >= 200 && this.status < 400) {
                let data = JSON.parse(this.responseText);
                results.innerHTML = "";
                data.records.forEach(skolor => {
                    let html = '';
                    if (skolor.fields.omrade === omrade.value) {

                        html += `
                    <div class="card mb-2">
                        <div class="card-header">
                            <h2>Skolnamn: ${skolor.fields.namn}</h2> <span class="d-flex justify-content-end">Område: ${skolor.fields.omrade}</span>
                        </div>
                        <div class="card-body">
                            <h6>Gatuadress: ${skolor.fields.gatuadress}</h6>
                            <span>Skolan websida: <a href="${skolor.fields.url}">${skolor.fields.url}</a></span>
                        </div>
                    </div>
                    `;

                        results.innerHTML += html;
                    }

                });
            }

        }
        xhr.send();
    }, 1500);





    e.preventDefault();
}






//const link = 'https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=skolor_ny&q=&facet=namn&facet=omrade&facet=skoltyp&facet=huvudman';