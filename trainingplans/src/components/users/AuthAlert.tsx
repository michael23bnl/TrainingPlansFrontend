

export const AuthAlert = ({ onClose, onLoginRedirect }: { 
  onClose: () => void; 
  onLoginRedirect: () => void 
}) => (
  <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-2">
    <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full border border-gray-700 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-4">Требуется авторизация</h3>
      <p className="mb-6 text-gray-300">
        Для добавления в избранное необходимо войти в систему.
      </p>
      <div className="flex justify-end space-x-3">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          Отмена
        </button>
        <button 
          onClick={onLoginRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium"
        >
          Войти
        </button>
      </div>
    </div>
  </div>
);