const shimmer = () => {
  return (
    <div className="Restraulist">
    {Array(10).fill("").map((e, index) => (
      <div key={index} className="shimmerUI"></div>
    ))}
   
    </div>
  )
}

export default shimmer
