import styles from './dog.module.css'
export default function Dog() {
    return (
        <div className='flex flex-1 place-content-center bg-purple-900 p-10 min-h-screen'>
            <div className={styles.dog}>
                <div className={styles.body} />
                <div className={styles.cheast} />
                <div className={styles.head}>
                    <div className={styles.face}>
                        <div className={`${styles.eye} ${styles['eye--left']}`} />
                        <div className={`${styles.eye} ${styles['eye--right']}`} />
                        <div className={styles.nose} />
                        <div className={styles.mouth} />
                    </div>
                </div>
                <div className={styles.tail} />
                <div className={styles.legs}>
                    <div className={`${styles.legs__front} ${styles['legs__front--left']}`} />
                    <div className={`${styles.legs__front} ${styles['legs__front--right']}`} />
                    <div className={`${styles.legs__back} ${styles['legs__back--left']}`} />
                    <div className={`${styles.legs__back} ${styles['legs__back--right']}`} />
                </div>
                <div className={`${styles.heart} ${styles['heart--1']}`} />
                <div className={`${styles.heart} ${styles['heart--2']}`} />
                <div className={`${styles.heart} ${styles['heart--3']}`} />
                <div className={`${styles.heart} ${styles['heart--4']}`} />
                <div className={styles['year--left']} />
                <div className={styles['year--right']} />
            </div>
        </div>
    )
}
