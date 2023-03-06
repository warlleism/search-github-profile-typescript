import { useEffect, useState } from 'react';
import { IGitProfile } from './../interfaces/iGitProfile';

type Props = {
    param: string
}

export function useGitProfile({ param }: Props) {

    const [response, setResponse] = useState<IGitProfile>({
        name: '',
        avatar_url: '',
        followers: 0,
        following: 0,
        location: '',
        message: ''
    })

    const [error, setError] = useState<Error | null>(null)
    const [user, setUser] = useState<string>(param)

    useEffect(() => {
        fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(data => setResponse(data))
            .catch((err) => {
                setError(err)
            })
    }, [user])


    return { response, error, setUser }
}
