import axios from "axios";
import { useDispatch } from "react-redux";

export default async function CheckSession()
{
    console.log('Running getVerifiedSession')
    const dispatch = useDispatch()
    try
    {
        const response = await axios.get("http://localhost:5000/api/student/getMe")
        if (response.status === 200)
        {
            dispatch({type: 'ON_LOGGED_IN'})
        }

    }
    catch(err)
    {
        console.log(`Error: ${err}`)
    }
}