import React, { useState } from "react"
import { Button, Modal, Form, InputGroup} from "react-bootstrap"
import { string, element } from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faCopy, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

const Share = ({ children, url, title, size, className, variant }) => {

    const [show, setShow] = useState(false)

    const handleShare = () => {
        setShow(true)
    }

    const copyUrl = () => {
        document.getElementById('shareurlinput').select();
        document.execCommand('copy');
        // document.getElementById('shareurlinput').select(false);
    }
    // console.log({children, ref})

    return <React.Fragment>
        {
            children?
                children({ handleShare })
                :
                <Button onClick={() => handleShare()} type="button" size={size} variant={variant} className={className}> 
                    <FontAwesomeIcon icon={faShareAlt} /> 
                    { title }
                </Button>
        }
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title  style={{ color: "#000" }}>
                    {title} 
                    <FontAwesomeIcon icon={faShareAlt} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <Form.Control
                        placeholder="Share URL"
                        aria-label="Share URL"
                        aria-describedby="Share-URL"
                        type="text"
                        id="shareurlinput"
                        defaultValue={url}
                        readOnly={true}
                        className="mt-0"
                    />
                    <InputGroup.Append>
                        <Button size="sm" variant="outline" style={{ color: "#8167a9", borderColor: "#8167a9" }} onClick={() => copyUrl()}>
                            <FontAwesomeIcon icon={faCopy} /> 
                            Copy
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <p className="mt-4">
                    <a href={`mailto:?subject=${encodeURI('#TheGeekHUB')}&body=${encodeURI(url)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded text-white ml-3" style={{ background: "#8167a9", borderColor: "#8167a9" }} >
                        <FontAwesomeIcon size="2x" icon={faEnvelopeOpen} />
                    </a>
                </p>
            </Modal.Body>
        </Modal>
    </React.Fragment>

}

Share.defaultProps = {
    url: window.location,
    title: "Share",
    size: "sm",
    className: "font-weight-bold mr-4",
    variant: "outline-success"
}

Share.propTypes = {
    url: string.isRequired,
    title: string,
    size: string,
    className: string,
    variant: string,
    children:element
}

export default Share;

