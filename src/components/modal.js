import React, { useEffect } from 'react';

const Modal = props => {
	const { active, children, hideCallback } = props;

	const hideModal = () => {
		hideCallback();
	};
	const handleKeyDown = e => {
		if (e.key == 'Escape') {
			hideModal();
		}
	};
	const handleClick = e => {
		if (!e.target.classList.contains('modal-content') && e.target.classList.contains('modal')) {
			hideModal();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('click', handleClick);
		};
	});

	return (
		<div className={`modal ${active ? 'active' : 'inactive'}`}>
			<div className="modal-content">{children}</div>
		</div>
	);
};

export { Modal };
