import styles from "../../../../../styles/forms.module.css";
import Link from "next/link";

interface P {
    success : boolean,
    message : string, 
    redirectLink : string,
    onClose: (b: boolean) => void,
}

export const SubmissionConfirmed  = ({success, message, redirectLink, onClose} : P) => {
    return <div className={styles.submissionConfirmedWrapper}>
        <div className={styles.submissionConfirmedDiv}>
            <h3 className={success ? styles.success : styles.failed}>
                {success ? "Success!" : "Something went wrong!"}
            </h3>
            <p>
                {message}    
            </p>
            <div>
                <a href="#" onClick={e => onClose(false)}>
                    Close
                </a>
                <Link href={redirectLink}>
                    Open Details
                </Link>
            </div>
        </div>
    </div>
}