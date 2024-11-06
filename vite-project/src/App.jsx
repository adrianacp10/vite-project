import { TwitterFollowCard } from "./TwitterFollowCard";

export function App() {
  const format = (userName) => `@${userName}`

  return (
    <section>
    <TwitterFollowCard
    formatUserName={format} 
    initialIsFollowing={true} 
    userName="Adrianacp10" 
    name="Adriana"/>

    <TwitterFollowCard 
    formatUserName={format} 
    isFollowing={false} 
    userName="JuanC" 
    name="Juan Carlos"/>
    </section>

  )
};