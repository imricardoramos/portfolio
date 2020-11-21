import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Head from 'next/head'
import MainLayout from '~/layouts/MainLayout';
import FollowButton from '~/components/FollowButton'
import Card from '~/components/Card'
import Tabs from '~/components/Tabs'
import Feed from '~/components/Feed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import RoundedButton from '~/components/RoundedButton';
import BoardSelector from '../../components/BoardSelector';
import UserSignature from '~/components/UserSignature';

export default function Home() {
  let [pinData, setPinData] = useState({})
  let [suggestedPinsData, setSuggestedPinsData] = useState([])
  let router = useRouter()

  useEffect( async () => {
    if(router.query.id){
      const response = await axios.get(`/pin/${router.query.id}/`)
      setPinData(response.data)
      const response2 = await axios.get(`/pin/`)
      setSuggestedPinsData(response2.data)
    }
  }, [router.query])

  return (
    <MainLayout>
      <div className="md:container mx-auto max-w-lg">
        <Card>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <a href={pinData.link}>
                <img className="w-full" src={pinData.image} />
              </a>
            </div>
            <div className="p-5 pl-10 w-full md:w-1/2">
              <div className="flex items-center justify-between">
                <div>
                  <RoundedButton><FontAwesomeIcon icon={faEllipsisH} /></RoundedButton>
                  <RoundedButton className="ml-2"><FontAwesomeIcon icon={faShare} /></RoundedButton>
                </div>
                <BoardSelector pin={pinData} />
              </div>
              <div className="pr-5">
                <h1 className="text-4xl font-bold">{pinData.title}</h1>
                <p>{pinData.description}</p>
                <div className="flex justify-between my-2">
                  { pinData.author &&
                    <UserSignature user={pinData.author} includeFollowers />
                  }
                  <FollowButton user={pinData.author} />
                </div>
                <Tabs />
              </div>
            </div>
          </div>
        </Card>
        <h2 className="font-bold text-center mt-10 text-xl">More like this</h2>
        <Feed pins={suggestedPinsData} />
      </div>
    </MainLayout>
  )
}
