import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { IoMdNotifications } from 'react-icons/io';

const PersonalizeBox = () => {

    return (
        <div className="flex h-[50px] items-center ml-6">
            <div className="p-2">
                <IoMdNotifications size={26} className="cursor-pointer " />
            </div>

            <div className="p-2">
                <CgProfile size={22} className="cursor-pointer " />
            </div>
        </div>
    )
}

export default PersonalizeBox