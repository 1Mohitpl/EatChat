const shimmer = () => {
  return (
    <div  data-testid = "shimmer" className="Restraulist">
    {Array(20).fill("").map((e, index) => (
      <div key={index} className="shimmerUI"></div>
    ))}
   
    </div>
  )
}

export default shimmer
