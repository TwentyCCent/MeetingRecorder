import axios from 'axios';

export default class RecordService {

    saveRecording(audioBlob, meetingId) {  
        //the form data that will hold the Blob to upload
        const formData = new FormData();
        //add the Blob to formData
        formData.append('audio', audioBlob, meetingId);
        formData.append('meetingId', meetingId);
        //send the request to the endpoint
        fetch('http://localhost:3000/upload/', {
            method: 'POST',
            body: formData,
        })
            .then((response) => { 
                //console.table(response);
                console.log(response.status);
            })
            .then(() => {
                alert("Your recording is saved");
                //reset for next recording
                //resetRecording();
                //TODO fetch recordings
            })
            .catch((err) => {
                console.error(err.message);
                alert("An error occurred, please try again later :" + err.message);
                //reset for next recording
                //resetRecording();
            })
    }


    // discardRecording() {
    //     //show the user the prompt to confirm they want to discard
    //     if (confirm('Are you sure you want to discard the recording?')) {
    //         //discard audio just recorded
    //         resetRecording();
    //     }
    // }

    // resetRecording() {
    //     if (audioList.firstElementChild.tagName === 'audio') {
    //         //remove the audio
    //         audioList.firstElementChild.remove();
    //         //hide audio-list
    //         audioList.classList.add('d-none');
    //         audioList.classList.remove('d-flex');
    //     }
    //     //reset audioBlob for the next recording
    //     audioBlob = null;
    // }

    async getMeetings(projectId){
        
        const Meetings =  await axios.get(
            'http://localhost:3000/meetings/'+ projectId
         );

         return Meetings.data;
    }
}

//export default new RecordService();