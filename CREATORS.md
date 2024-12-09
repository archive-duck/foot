<!-- Черкасский архив -->

Religious institutions: 82

Magistrates and city councils: 1685

City, town, zemstvo, land, food administrations: 1869

Police and gendarmerie bodies: 18

Health care organizations: 2

Nobility offices and courts: 1318

Bodies of justice, court, prosecutor's office, prisons: 680

Жаботинський Онуфріївський чоловічий монастир м-ко Жаботин Черкаського пов.: 1

Village administrations, associations: 1677

Institutions of agriculture and forestry: 0

Election offices: 274

Financial bodies, tax and credit institutions: 1

Local administrative and military-administrative institutions: 37

Office of military commanders: 103

```js
const getTotalByCreator = async (creatorName) => {
    const TOKEN = "p0-AXtb6yxxY4O.ndGCqNxQZZI";
    const FROM_DATE = "2024-01-01"
    
    const res = await fetch("https://www.familysearch.org/records/images/orchestration/", {
      "headers": {
        "accept": "*/*",
        "authorization": `Bearer ${TOKEN}`,
        "content-type": "application/json",
      },
      "body": JSON.stringify({
        "operationName": "GroupSearch",
        "variables": {
            "searchInput": {
                "page": 1,
                "pageSize": 1,
                "returnIdsOnly": true,
                "creator": creatorName,
                "modifiedFromDate": FROM_DATE
            }
        },
        "query": `
            query GroupSearch($searchInput: SearchInput!) {
              search(searchInput: $searchInput) {
                totalCount
              }
            }`
      }),
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
    const { data } = await res.json();
    return data.search.totalCount;
}

const names = {};

``.split('\n').filter(el => Boolean(el) && !el.startsWith('<!--')).map(el => {
    const [name, count] = el.split(': ');
    names[name] = count;
});

console.log(new Date().toISOString());

for (const [name, count] of Object.entries(names)) {
    const newCount = await getTotalByCreator(name);
    if (+newCount !== +count) {
        const color = +count > +newCount ? "red" : "lightgreen";
        const logStyle = `background:${color};color:black;border-radius:5px;padding:0 2px;font-weight:bold;font-size:14px`;
        console.log(`"${name}": %c${count} => ${newCount}`, logStyle);
    }
}
```