/* To Fetch the User details for the given input data 
  If the type is "TableData" then Query will return the data for datatable
  If the type is "ExcelData" then Query  will return the data for Excel download
*/
const express = require('express');
const userlists = express.Router();
userlists.post('/', function (req, res, next) {
    //DB Connection
    const db = req.admin_db;
    const type = req.body.dbHitType;
    const coll = db.collection('User');
    delete req.body.dbHitType;
    if (!db || !db.collection) {
        res.json({});
        return;
    }
    // millisecond object for time conversion
    const ms = {
        day: 24 * 60 * 60 * 1000
    };
    const todayDate = new Date();
    // For DB Date Query - Calculating date here
    const dateAfter = (days, date) => new Date(new Date(date.toISOString()).valueOf() + days * ms.day);
    /** Accepts an element and checks whether it is null or undefined. 
     * Returns 'propertyNotExists' | 'propertyExists'  */
    const propertyStatus = element => (element === null || element === undefined || element.length === 0) ?
        'propertyNotExists' : 'propertyExists';
    let ArrayForMatchQuery = [];
    let keyWordMatchQuery = {};
    // Based on key the input is pushed into the array and match query is build
    const matchKeyWordGenerationTree = {
        'propertyExists': {
            // 'keywordSearch': () => {
            //     keyWordMatchQuery = {
            //         '$text': { '$search': req.body.keywordSearch }
            //     };
            // },

            'companyNames': () => {
                ArrayForMatchQuery.push({
                    'CompanyName': { '$in': req.body.companyNames }
                });
            },

            'userNames': () => {
                ArrayForMatchQuery.push({
                    'ContactDetails.EmailID': { '$in': req.body.userNames }
                });
            },

            'rolename': () => {
                ArrayForMatchQuery.push({
                    'UserType': { '$in': req.body.rolename }
                });
            },

            'fromDate': () => {
                // match query for displaying the userlist for all the users who are valid between from and to Date
                ArrayForMatchQuery.push({
                    '$or': [
                        {
                            '$and': [
                                { 'Contract.StartDate': { '$lte': new Date(req.body.fromDate) } },
                                { 'Contract.EndDate': { '$gte': new Date(req.body.toDate) } }
                            ]
                        },

                        {
                            '$and': [
                                { 'Contract.StartDate': { '$lte': new Date(req.body.fromDate) } },
                                { 'Contract.EndDate': { '$lte': new Date(req.body.toDate) } },
                                { 'Contract.EndDate': { '$gte': new Date(req.body.fromDate) } }
                            ]
                        },
                        {
                            '$and': [{
                                '$and': [
                                    { 'Contract.StartDate': { '$gte': new Date(req.body.fromDate) } },
                                    { 'Contract.StartDate': { '$lte': new Date(req.body.toDate) } }
                                ]
                            },
                            { 'Contract.EndDate': { '$gte': new Date(req.body.toDate) } }
                            ]
                        },
                        {
                            '$and': [{
                                '$and': [
                                    { 'Contract.StartDate': { '$gte': new Date(req.body.fromDate) } },
                                    { 'Contract.StartDate': { '$lte': new Date(req.body.toDate) } }
                                ]
                            }, {
                                '$and': [
                                    { 'Contract.EndDate': { '$lte': new Date(req.body.toDate) } },
                                    { 'Contract.EndDate': { '$gte': new Date(req.body.fromDate) } }
                                ]
                            }]
                        },
                    ]
                });
            },

            'daystoExpire': () => {
                ArrayForMatchQuery.push
                    ({
                        "Contract.EndDate": { "$gte": new Date(todayDate), '$lte': dateAfter(req.body.daystoExpire, todayDate) }
                    });
            }
        },
        'propertyNotExists': {
            'keywordSearch': () => {
                keyWordMatchQuery = {};
            }
        }
    };

    for (let property in req.body) {
        if (matchKeyWordGenerationTree.hasOwnProperty(propertyStatus(req.body[property]))) {
            if (matchKeyWordGenerationTree[propertyStatus(req.body[property])].hasOwnProperty(property)) {
                // Pattern Matching based on keys on inputObject
                matchKeyWordGenerationTree[propertyStatus(req.body[property])][property]();
            }
        }
    }

    let matchObject;
    if (ArrayForMatchQuery.length === 0) {
        matchObject = {
            '$match': {}
        };
    } else {
        matchObject = {
            '$match': {
                '$and': ArrayForMatchQuery
            }
        };
    }
console.log(JSON.stringify(matchObject))
    // Query for getting the userdetails for the given input
    if (type == "TableData") {
        var query = [
            matchObject,
            // {
            //     $match: keyWordMatchQuery
            // },
            {
                $lookup:
                    {
                        from: 'Contracts',
                        localField: 'Contract.ContractReference',
                        foreignField: 'contract_reference',
                        as: 'docs'
                    }
            },
            {
                // Get the relevant fields in userlogs Collection using emailid
                $lookup:
                    {
                        from: 'Userlogs',
                        localField: 'ContactDetails.EmailID',
                        foreignField: 'email_id',
                        as: 'docs2'
                    }
            },
            { $unwind: { path: '$docs', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$docs2', preserveNullAndEmptyArrays: true } },
            { $sort: { 'docs2.login_time': 1 } },

            {
                $group: {
                    '_id': {
                        'email': '$ContactDetails.EmailID',
                        'company_name': '$CompanyName',
                        'userType': '$UserType',
                        'userRole': '$UserRole',
                        'contract_reference': '$docs.contract_reference',
                        // 'download_limit': '$docs.download_limit',
                        // 'export_flag': '$docs.export_flag',
                        'general_alert_flag': '$general_alert_flag',
                        'valid_start_date': '$Contract.StartDate',
                        'valid_to_date': '$Contract.EndDate',
                        'created_date': '$CreatedDate',
                        'first_name': '$FirstName',
                        'last_name': '$LastName',
                        'user_status': '$UserStatus',
                    },
                  
                    'last_login': { '$last': '$docs2.login_time' },
                    'count': { '$sum': 1 }
                }
            },

            {
                $project: {
                    '_id': 0,
                    'User Name': '$_id.email',
                    'First Name': '$_id.first_name',
                    'Last Name': '$_id.last_name',
                    'Company Name': '$_id.company_name',
                    'Contract Reference': '$_id.contract_reference',
                    'User Type': '$_id.userType',
                    'User Role': '$_id.userRole',
                    // 'Download Limit': '$_id.download_limit',
                    'Export': '$_id.export_flag',
                    'General Alerts': '$_id.general_alert_flag',
                    'Valid From': '$_id.valid_start_date',
                    'Valid Till': '$_id.valid_to_date',
                    'Access Count': { $ifNull: ['$count', ''] },
                    'Status': '$_id.user_status',
                    'User Created On': '$_id.created_date',
                    'Last Login': { $ifNull: ['$last_login', ''] },
                }
            }
        ];

        coll.aggregate(query).then((docs) => {
            res.json(docs);
        }).catch((err) => {
            console.log('Error in retriving users list from DB ' + err);
            res.json(err);
        })
    }
    // Query is Build for Excel data
    else if (type == "ExcelData") {
        // Get the registered users list
        var query1 = [
            {
                $match: keyWordMatchQuery
            },
            // Get the relevant fields in Contracts Collection using contract_reference
            {
                $lookup:
                    {
                        from: 'Contracts',
                        localField: 'Contract.ContractReference',
                        foreignField: 'contract_reference',
                        as: 'docs'
                    }
            },
            { $unwind: { path: '$docs', preserveNullAndEmptyArrays: true } },
            matchObject,
            {
                $group: {
                    '_id':
                        {
                            email: '$ContactDetails.EmailID',
                            company_name: '$CompanyName',
                            // download_limit: '$docs.download_limit',
                            general_alert_flag:
                                {
                                    '$cond':
                                        {
                                            if: { '$eq': ['$general_alert_flag', true] },
                                            then: 'Yes',
                                            else: 'No'
                                        }
                                },
                            valid_start_date: { $dateToString: { format: "%d-%m-%Y", date: '$Contract.StartDate' } },
                            valid_to_date: { $dateToString: { format: "%d-%m-%Y", date: '$Contract.EndDate' } },
                            created_date: { $dateToString: { format: "%d-%m-%Y", date: '$CreatedDate' } },
                            first_name: '$FirstName',
                            last_name: '$LastName',
                            user_status: '$UserStatus'
                        }
                }
            },
            {
                $project: {
                    '_id': 0,
                    'CREATED ON': '$_id.created_date',
                    'FIRST NAME': '$_id.first_name',
                    'LAST NAME': '$_id.last_name',
                    'USER NAME': '$_id.email',
                    'DOWNLOAD': '$_id.download_limit',
                    'VALID FROM': '$_id.valid_start_date',
                    'VALID TO': '$_id.valid_to_date',
                    'COMPANY NAME': '$_id.company_name',
                    'GENARAL ALERT': '$_id.general_alert_flag',
                    'Status': '$_id.user_status',
                    'FIRST_NAME_insensitivity': { $toLower: '$_id.first_name' },
                    'LAST_NAME_insensitivity': { $toLower: '$_id.last_name' },
                }
            },
            {
                $sort: { Status: 1, 'FIRST_NAME_insensitivity': 1, 'LAST_NAME_insensitivity': 1 }
            },
            {
                $project: { 'FIRST_NAME_insensitivity': 0, 'LAST_NAME_insensitivity': 0 }
            }
        ];
        var userCollection = {};
        var userDetails = new Promise((resolve, reject) => {
            coll.aggregate(query1, function (err, doc) {
                if (err) { console.log("error in section : " + err); resolve([]); }
                else if (doc && doc.length) { userCollection["userDetails"] = doc; resolve([]); }
                else { resolve([]); }
            });
        });
        //   Get the user access details for the given user
        var query2 = [
            {
                $match: keyWordMatchQuery
            },
            {
                // Get the relevant fields in userlogs Collection using emailid
                $lookup:
                    {
                        from: 'Userlogs',
                        localField: 'ContactDetails.EmailID',
                        foreignField: 'email_id',
                        as: 'docs2'
                    }
            },
            { $unwind: { path: '$docs2', preserveNullAndEmptyArrays: true } },

            matchObject,
            {
                $group: {
                    '_id': {
                        'email': '$ContactDetails.EmailID',
                        'login_time': "$docs2.login_time",
                        'logout_time': "$docs2.logout_time",
                    },
                    "count": { "$sum": 1 }
                }
            },
            {
                $project:
                    {
                        "USER NAME": "$_id.email",
                        "LOGIN TIME": "$_id.login_time",
                        "LOGOUT TIME": "$_id.logout_time",
                        "ACCESS COUNT": "$count",
                        'USER_NAME_insensitivity': { $toLower: "$_id.email" },
                        _id: 0
                    }
            },
            { $sort: { 'USER_NAME_insensitivity': 1, 'LOGIN TIME': -1 } },
            {
                $project: { 'USER_NAME_insensitivity': 0 }
            }
        ];

        var userAccess = new Promise((resolve, reject) => {
            coll.aggregate(query2, function (err, doc) {
                if (err) { console.log("error in section : " + err); resolve([]); }
                else if (doc && doc.length) { userCollection["userAccess"] = doc; resolve([]); }
                else { resolve([]); }
            });
        });

        var query3 = [
            {
                // Search by Keyword
                $match: keyWordMatchQuery
            },
            {
                // Get the relevant fields in userlogs Collection using emailid
                $lookup:
                    {
                        from: 'Userlogs',
                        localField: 'ContactDetails.EmailID',
                        foreignField: 'email_id',
                        as: 'docs2'
                    }
            },
            { $unwind: { path: '$docs2', preserveNullAndEmptyArrays: true } },
            matchObject,
            {
                $group: {
                    '_id': '$ContactDetails.EmailID',
                    login_time: { '$addToSet': '$docs2.login_time' },
                    logout_time: { '$addToSet': '$docs2.logout_time' }
                }
            },
            {
                $project:
                    {
                        "USER NAME": "$_id",
                        "ACCESS COUNT": { "$size": { $setDifference: ["$login_time", [null]] } },
                        "USER_NAME_insensitivity": { $toLower: "$_id" },
                        _id: 0
                    }
            },
            { $sort: { 'USER_NAME_insensitivity': 1 } },
            {
                $project: { 'USER_NAME_insensitivity': 0 }
            }
        ];
        console.dir(query3, { depth: null, colors: true });
        const userAccessCount = new Promise((resolve, reject) => {
            coll.aggregate(query3, (err, doc) => {
                if (err) { console.log("error in section : " + err); resolve([]); }
                else if (doc && doc.length) { userCollection["userAccessCount"] = doc; resolve([]); }
                else { resolve([]); }
            });
        });
        // After all the query is executed the response will be sent 
        var promiseResolved = [userDetails, userAccess, userAccessCount];
        Promise.all(promiseResolved).then(function (values) {
            console.log(Object.keys(userCollection));
            res.send(userCollection);
            res.end();
        }, function (err) {
            res.send([]);
            res.end();
        });
    }
})

module.exports = userlists;
