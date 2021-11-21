
export default function BlankPost({ height, width, counter }) {
    if (counter % 2) counter = 0
    else counter = 1
    const color = {
        0: "#006ef7",
        1: "#abaaaa"
    }
    const divstyle = {
        width: width,
        height: height,
        background: color[counter]
    }

    return (
        <>
            <div className="blankpost" style={divstyle}></div>
        </>
    )
}