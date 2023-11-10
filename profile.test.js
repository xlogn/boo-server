const util = require('util');
const {isNullOrUndefinedOrEmpty} = require("./constants");
const exec = util.promisify(require('child_process').exec);
const createProfile = async (name, mbti) => {
    const profileCurl = `curl --location 'http://localhost:3000' \\
--header 'Content-Type: application/json' \\
--data '{
    "name": "${name}",
    "description": "The neatest dev",
    "mbti": "${mbti}",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL"
}'`
    const rawProfile = await executeCurl(profileCurl);
    if(isNullOrUndefinedOrEmpty(rawProfile)) {
        return {};
    }
    return JSON.parse(rawProfile);
}

const createVote = async (profile1Id, profile2Id, comment) => {
    const voteCurl = `curl --location 'http://localhost:3000/vote' \\
--header 'Content-Type: application/json' \\
--data '{
    "profileId": "${profile1Id}",
    "voterProfileId": "${profile2Id}",
    "title": "${comment}",
    "voteMeta": { "MBTI": "INFT" },
    "comment": "comment"
}'`
   const rawVote = await executeCurl(voteCurl);
    if(isNullOrUndefinedOrEmpty(rawVote)) {
        return {};
    }
    return JSON.parse(rawVote);
}


const executeCurl = async (curlCommand) => {

    const { error, stdout, stderr } = await exec(curlCommand);
    if (error) {
        console.error(`Error: ${error.message}`);
        return {};
    }
    console.log(`Response: ${stdout}`);
    return stdout;
}

const createTestData = async () => {
    const profile1 = await createProfile("Karan", "ISFJ");
    const profile2 = await createProfile("Charu", "INFT");
    if(!isNullOrUndefinedOrEmpty(profile1) && !isNullOrUndefinedOrEmpty(profile2)){
        const profile1Id = profile1?.data?._id, profile2Id = profile2?.data?._id;
        const vote = await createVote(profile1Id, profile2Id, "Charu comments for karan");
        return vote;
    }
    return {};
};

exports.createTestData = createTestData;