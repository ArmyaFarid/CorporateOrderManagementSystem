import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Route Not Found</h1>
            <p style={styles.message}>The requested page could not be found.</p>
            <button style={styles.button} onClick={handleGoHome}>
                Go Home
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f1f1f1',
    },
    heading: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    message: {
        fontSize: '18px',
        color: '#666',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default ErrorPage;
