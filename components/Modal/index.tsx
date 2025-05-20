import { ReactNode } from "react"

type props = {
    children: ReactNode,
    isShow: boolean
}

const Modal = (myProp: props) => {
    return(
        <div className={`z-[1002] w-dvw h-dvh fixed top-0 left-0 bg-black bg-opacity-75 flex justify-center items-center ${myProp.isShow ? `block`: `hidden`}`}>
            <div className="w-5/6 md:w-4/6 lg:w-3/6 bg-white rounded-md">
                {myProp.children}
            </div>
        </div>
    )

}

export default Modal