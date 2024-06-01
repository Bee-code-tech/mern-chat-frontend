import React, {useState} from 'react'

import TopicSkeleton from '../../components/skeletons/TopicSkeleton'
import { useEffect } from 'react'
import NotificationCard from './NotificationCard'
import picf from '../../assets/note.png'

const Notification = () => {
    const [loading, setLoading] = useState(false)
    const [topics, setTopics] = useState(['2', '3', '4', '5'])

    useEffect(() => {

      // setTimeout(() => setLoading(true), 3000)
      
        setTopics[[...Array(3)]]
     

    }, [])
    

  if (loading){
    return (
      <div className="flex items-start flex-col gap-4 justify-center mt-8" role="status">
        {
          [...Array(3)].map((_, idx) => <TopicSkeleton key={idx} />)
        }
      </div>
    );
  }

  return (
    <section className="space-y-5 px-3 mt-12">
      {topics.length > 0 ? (
        <div className="space-y-8">
          {topics &&
            topics.map((_, idx) => (
              <NotificationCard
                key={idx}
              />
            ))}
        </div>
      ) : (
        <div className="flex h-[600px] mt-12 justify-center flex-col w-full  items-center">
        <div className="h-full overflow-hidden md:w-[50%] lg:w-[60%] w-[100%] mx-auto flex justify-center items-center">
        <img src={picf} alt="" className="w-[100% ]  object-cover" />
        

        </div>
        <h1 className="text-xl font-bold">You have no notifications yet</h1>
      </div>
      )}
    </section>
  );
}

export default Notification
