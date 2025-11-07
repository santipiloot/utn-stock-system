import Button from './Button';

export default function VentanaModalBase({ show, onHide, title, children }){

    if (!show){
        return null;
    }

    return (
        <>
            <div className='modal-backdrop fade show'></div>

            <div
            className='modal fade show d-block'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='modalTitle'
            aria-modal='true'
            style={{ zIndex: 1050 }}
            >
                <div className='modal-dialog modal-dialog-centered' role='document'>
                    <div className='modal-content'>
                        {/* Header */}
                        <div className='modal-header'>
                            <h5 className='modal-title' id='modalTitle'>
                                {title}
                            </h5>
                            <Button 
                                variant='close'
                                onClick={onHide}
                                width='10'
                            />
                        </div>
                        
                        {/* Body (El contenido inyectado) */}
                        <div className='modal-body'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}