import styles from './Loading.module.css';

function Loading() {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className={styles.main}>
                <div className={styles.droplet_spinner}>
                    <div className={styles.droplet}></div>
                    <div className={styles.droplet}></div>
                    <div className={styles.droplet}></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
