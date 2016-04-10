import eventBus 	from '../../scripts/eventbus';
import AppEvents 	from '../../scripts/appevents';

const TestTag = {
	triggerShowToastSuccess() {
		eventBus.trigger(
			AppEvents.Elements.Toast.Show,
			'Success!',
			'success');
	},
	triggerShowToastInfo() {
		eventBus.trigger(
			AppEvents.Elements.Toast.Show,
			`Aliquam quis incidunt. Autem accusantium recusandae, quis
			 obcaecati eveniet inventore. Fugit explicabo obcaecati, voluptate
			 repellat vel, asperiores deserunt facere saepe iste est.`,
			'info');
	},
	triggerShowToastWarning() {
		eventBus.trigger(
			AppEvents.Elements.Toast.Show,
			'You have been warned!',
			'warning');
	},
	triggerShowToastError() {
		eventBus.trigger(
			AppEvents.Elements.Toast.Show,
			`Blanditiis laboriosam impedit quibusdam sit, dicta eaque tempore
			 laboriosam impedit quibusdam sit, dicta eaque tempore laboriosam
			 impedit quibusdam sit, dicta eaque tempore, aliquam quis incidunt.
			 Autem accusantium recusandae, quis obcaecati eveniet inventore.
			 Fugit explicabo obcaecati, voluptate repellat vel, asperiores
			 deserunt facere saepe iste est.`,
			'error');
	}
};

export default TestTag;
