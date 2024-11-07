import styles from './Loading.module.css';

function Loading({ text }: { text?: string }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <div className={styles.main}>
                <div className={styles.droplet_spinner}>
                    <div className={styles.droplet}></div>
                    <div className={styles.droplet}></div>
                    <div className={styles.droplet}></div>
                </div>
            </div>
            {Boolean(text) && <span className="text-sm text-gray-500">{text}</span>}
        </div>
    );
}

export default Loading;
