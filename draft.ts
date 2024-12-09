// fetch("https://www.familysearch.org/records/images/orchestration/", {
//   headers: {
//     accept: "*/*",
//     "accept-language": "en,uk;q=0.9",
//     authorization: "Bearer p0-t0nFRHPrQnX.VwCRkmC1wVN",
//     "content-type": "application/json",
//     "sec-ch-ua":
//       '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Linux"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "timezone-offset": "-120",
//     "user-locale": "en",
//     "x-dtpc": "20$289031772_482h124vKFKVPIPLGFNOUPFCWUCTFTQHQOUMAHEW-0e0",
//     "x-dtreferer":
//       "https://www.familysearch.org/records/images/beta/search-results?keyword=%22%D0%A0-6193-2%22",
//   },
//   referrer:
//     "https://www.familysearch.org/records/images/beta/search-results?keyword=%22%D0%A0-6193-1%22&page=1",
//   referrerPolicy: "strict-origin-when-cross-origin",
//   body: JSON.stringify({
//     operationName: "GroupSearch",
//     variables: {
//       searchInput: {
//         keyword: '"Р-6193-1"',
//         page: 1,
//         pageSize: 10,
//         "sortBy": [{ field: "metadata", order: "DESC" }],
//       },
//       withRework: false,
//     },
//     query: `query GroupSearch($searchInput: SearchInput!, $withRework: Boolean!) {
//                   search(searchInput: $searchInput) {
//                     groups {
//                       captureDate {
//                         fromTimestamp
//                         __typename
//                       }
//                       childCount
//                       childNumber
//                       coverages {
//                         place {
//                           fullName
//                           __typename
//                         }
//                         recordType {
//                           name
//                           __typename
//                         }
//                         __typename
//                       }
//                       dateRange {
//                         fromTimestamp
//                         toTimestamp
//                         __typename
//                       }
//                       externalId
//                       groupName
//                       id
//                       imageApids(limit: 1)
//                       indexedChildCount
//                       languages
//                       lastImageRework @include(if: $withRework) {
//                         state
//                         __typename
//                       }
//                       metadata {
//                         archivalReferenceNumber
//                         createdDate {
//                           fromTimestamp
//                           __typename
//                         }
//                         creator
//                         custodian
//                         imageGroupNumber
//                         languages
//                         modifiedDate {
//                           fromTimestamp
//                           __typename
//                         }
//                         title
//                         volume
//                         __typename
//                       }
//                       naturalGroupId
//                       parentGroupId
//                       phoenixAcquisitionIds
//                       properties(
//                         names: ["archiveReferenceNumber", "author", "cameraOperator", "creator", "custodian", "indexStatus", "language", "needsRework", "originalMediaNumber", "title", "volume"]
//                       ) {
//                         name
//                         values
//                         __typename
//                       }
//                       siblingCount
//                       types
//                       volumes
//                       __typename
//                     }
//                     totalCount
//                     __typename
//                   }
//                 }`,
//   }),
//   method: "POST",
//   mode: "cors",
//   credentials: "include",
// })
//   .then((res) => res.json())
//   .then(({ data }) => console.log(data.search));


// fetch("https://www.familysearch.org/records/images/orchestration/", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en,uk;q=0.9",
//     "authorization": "Bearer p0-t0nFRHPrQnX.VwCRkmC1wVN",
//     "content-type": "application/json",
//     "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Linux\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "timezone-offset": "-120",
//     "user-locale": "en",
//     "x-dtpc": "20$289031772_482h124vKFKVPIPLGFNOUPFCWUCTFTQHQOUMAHEW-0e0",
//     "x-dtreferer": "https://www.familysearch.org/records/images/beta/search-results?keyword=%22%D0%A0-6193-2%22"
//   },
//   "referrer": "https://www.familysearch.org/records/images/beta/search-results?keyword=%22%D0%A0-6193-1%22&page=1",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": JSON.stringify({
//     "operationName": "GroupSearch",
//     "variables": {
//         "searchInput": {
//             "keyword": "\"Р-6193-1\"",
//             "page": 1,
//             "pageSize": 10,
//         },
//         "withRework": false
//     },
//     "query": `query GroupSearch($searchInput: SearchInput!) {
//                   search(searchInput: $searchInput) {
//                     groups {
//                       externalId
//                       groupName
//                       id
//                       metadata {
//                         volume
//                       }
//                       title
                      
//                       __typename
//                     }
//                     totalCount
//                     __typename
//                   }
//                 }`
// }),
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// }).then(res => res.json()).then(({data}) => console.log(data.search))