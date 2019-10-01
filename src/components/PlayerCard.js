import React from 'react'

const PlayerCard = ({ track }) => (
  <div className="flex flex-col rounded border border-black overflow-hidden">
    <img className="w-64 h-64 border-b border-black" />
    <section className="relative p-2 border-b border-black">
      Listen
      <div className="progress"></div>
    </section>
    <section className="px-2 py-1 flex flex-col">
      <h1 className="font-bold">{track.title}</h1>
      <h2 className="font-sm">{track.artist}</h2>
    </section>
  </div>
)

export default PlayerCard
