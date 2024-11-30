import React from 'react'
import { getGreeting } from '../dashboard/helpers'
import useUserStore from '../../../store/userStore';

const WelcomeBox = () => {
    const userDetails = useUserStore((state) => state.userDetails);
    return (
        <div className="flex flex-col text-left">
            <h1 className="text-stone-500">{getGreeting()}, </h1>
            <p className="text-[28px]">{userDetails?.first_name || null} {userDetails?.last_name || 'Anonymous'} </p>
        </div>
    )
}

export default WelcomeBox