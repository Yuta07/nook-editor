import './Cta.scss'

const HOW_TO_TXT = ['Signup or Login.', 'Create article.', 'Post article.', 'Publish on your nook url.']

export const Cta = () => {
	return (
		<div className="cta-container">
			<h1 className="cta-hero">
				Leave intelligence in nook.<p className="cta-how-txt">👇 How to use. 👇</p>
			</h1>
			{HOW_TO_TXT.map((data, i) => {
				return (
					<h2 key={data} className="cta-list-hero">
						<span className="cta-list-num">{i + 1}</span>
						{data}
					</h2>
				)
			})}
			<div className="cta-main-image" />
		</div>
	)
}
