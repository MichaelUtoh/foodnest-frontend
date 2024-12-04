import React, { useEffect, useState } from 'react'
import WelcomeBox from '../navigation/Welcome';
import SearchBox from '../navigation/Search';
import Profile from './profile';
import Security from './security';
import UserManagement from './users';
import Notiification from './notification';
import Upload from './upload';

const DashboardSettings = () => {
    const settings_list = ['Profile', 'Security', 'Users', 'Notification', 'Upload']
    const [selectedField, setSelectedField] = useState<string | null>('Profile');

    const renderComponent = () => {
        switch (selectedField) {
            case 'Profile':
                return <Profile />;
            case 'Security':
                return <Security />;
            case 'Users':
                return <UserManagement />;
            case 'Notification':
                return <Notiification />;
            case 'Upload':
                return <Upload />;
            default:
                return <div>Select a setting to view details.</div>;
        }
    };

    return (
        <div className="border-l border-gray-300 flex flex-col py-4 p-6 w-full">

            <div className="flex items-end justify-between">
                <WelcomeBox />
                <SearchBox />
            </div>

            <div className='flex mt-4'>
                <div className='flex flex-col flex-wrap pr-3 text-left w-2/12'>
                    {settings_list.map((obj) => (
                        <div key={obj} className={`${selectedField === obj ? 'bg-stone-900 text-white' : "bg-gray-50"} mb-4 p-4`} onClick={() => setSelectedField(obj)}>
                            <p>{obj}</p>
                        </div>
                    ))}
                </div>

                <div className='bg-blue-100 flex h-[500px] w-10/12'>
                    {renderComponent()}
                </div>
            </div>

        </div>
    )
}

export default DashboardSettings;